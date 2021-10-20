#!/usr/bin/env bash
# shellcheck disable=SC2154
# shellcheck disable=SC1091

# Configure
set -e
cd "$(dirname "${BASH_SOURCE[0]}")"
OUTPUT_TMP_DIR="./__tmp"
CLIENT_SRC="$(pwd)/../WebApp"
source ./tools/yaml.sh

# Default
DEBUG=1
SERVICE=all
CLIENT_TYPE=all


# Functions
function ts_generate_api() {
    local name=$1
    local url=$2
    local version=$4
    local modulePrefix="$(tr '[:lower:]' '[:upper:]' <<< ${name:0:1})${name:1}"

    echo "[typescript] Generating $name v$version from $url"

    java -jar ./tools/openapi-generator-cli.jar generate \
            -i ${url}/v2/api-docs \
            -g typescript-angular \
            -o ${OUTPUT_TMP_DIR}/${name}/typescript \
            --additional-properties=providedInRoot=true,ngVersion=${ngVersion},stringEnums=true,npmRepository=http://localhost,npmVersion=${version},apiModulePrefix=${modulePrefix},npmName=@demo/${name}-api,withInterfaces=true
}

function ts_build_client() {
    local api_path=${OUTPUT_TMP_DIR}/$1/typescript
    local root_path=$(pwd)

    echo "[typescript] Building $api_path"

    cd $api_path
    npm install
    npm run build
    cd dist
    npm pack
    cd $root_path
}

function ts_install_client() {
    local name=$1
    local version=$2
    local api_path=${OUTPUT_TMP_DIR}/$1/typescript
    local package=demo-${name}-api-${version}.tgz
    local root_path=$(pwd)

    echo "[typescript] Installing $package"

    cp -f $api_path/dist/${package} $CLIENT_SRC/src/generated
    cd $CLIENT_SRC
    npm install src/generated/${package} --save

    cd $root_path
}

function clean_previous() {
    if [ -d "$OUTPUT_TMP_DIR" ]; then
        echo "Cleaning previous generated services"
        rm -Rf $OUTPUT_TMP_DIR
    fi
}


# Clean
clean_previous

# Execute
create_variables api.yml

x=0
for i in ${services__name[*]}; do
    if [ "all" = "$SERVICE" ]; then
        if [ "all" = "$CLIENT_TYPE" ] || [ "typescript" = "$CLIENT_TYPE" ]; then
          ts_generate_api ${i} ${services__baseUrl[x]} ${services__prefix[x]} ${services__version[x]}
          ts_build_client ${i}
          ts_install_client ${i} ${services__version[x]}
        fi
    else
        echo "Skipping $i"
    fi

    x="$((x+1))"
done

# Clean
clean_previous
