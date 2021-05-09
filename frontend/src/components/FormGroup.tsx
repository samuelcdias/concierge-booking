import styles from "../styles/components/fields.module.css"

function FormGroup(props: any) {
    return (
        <div className={styles.marginBottom}>
            <label
                className={styles.label}
                htmlFor={props.htmlFor}
            >
                {props.label}
            </label>
            {props.children}
            <small className={styles.text}>{props.text}</small>
        </div>
    );
}

export default FormGroup;
