package com.example.demo.entities;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.hibernate.proxy.HibernateProxy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.InvalidPropertyException;
import org.springframework.beans.PropertyAccessorFactory;

import javax.persistence.*;
import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@MappedSuperclass
public abstract class BaseEntity implements Serializable {

	private static final long serialVersionUID = 7258437721352045914L;

    private final static Logger LOG = LoggerFactory.getLogger(BaseEntity.class);

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Version
	@Column(columnDefinition = "int default 0")
	private int version;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	@Override
	public int hashCode() {
		if (id != null) {
			return Objects.hashCode(id);
		} else {
			return super.hashCode();
		}
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (obj == this) {
			return true;
		}
		if (getId() == null) {
			return equalsForUnsaved(obj);
		}
		if (obj.getClass() != getClass() && !(obj instanceof HibernateProxy && ((HibernateProxy) obj).getHibernateLazyInitializer().getPersistentClass() == getClass())) {
			return false;
		}
		final BaseEntity otherEntity = (BaseEntity) obj;
		return new EqualsBuilder().append(id, otherEntity.getId()).isEquals();
	}

	/** this has no id yet : case of unsaved entity */
	protected boolean equalsForUnsaved(Object other) {
		return this == other;
	}

	@SuppressWarnings("rawtypes")
	public String[] getIgnoredPropertyNames(Object source) {
		final BeanWrapper src = PropertyAccessorFactory.forBeanPropertyAccess(source);
		PropertyDescriptor[] pds = src.getPropertyDescriptors();
		Set<String> emptyNames = new HashSet<String>();
		emptyNames.add("id");
		for (PropertyDescriptor pd : pds) {
			if (pd.getReadMethod() != null) {
			    try {
                    Object srcValue = src.getPropertyValue(pd.getName());
                    if (srcValue == null) {
                        emptyNames.add(pd.getName());
                    }
                    if ((srcValue instanceof Set) && ((Set) srcValue).isEmpty()) {
                        emptyNames.add(pd.getName());
                    }
                } catch (InvalidPropertyException exception) {
                    LOG.warn("La propri??t?? "+pd.getName()+"n'est pas un attribut");
                }
			}
		}
		return emptyNames.toArray(new String[] {});
	}

	@Override
	public String toString() {
		if (id == null) {
			return super.toString();
		} else {
			return getClass().getName() + " [id=" + id + "]";
		}
	}

}
