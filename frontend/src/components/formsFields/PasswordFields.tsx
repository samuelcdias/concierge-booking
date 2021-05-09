import FormGroup from "../FormGroup";
import Input from "../Input";
import styles from "../../styles/components/fields.module.css"

export default function PasswordsFields({ state, params, handleChange }: any) {
    return (
        <>
            {(params.id === undefined) && (<>
                <div className={styles.displayLine}>
                    <FormGroup
                        label="Senha"
                    >
                        <Input
                            className={`input-password ${params.id && 'hidethis'}`}
                            type="password"
                            placeholder="Senha"
                            name="password"
                            value={state.password}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Confirmação de senha"
                    >
                        <Input
                            className={`input-confirm-password ${params.id && 'hidethis'}`}
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirme a Senha"
                            onChange={handleChange}
                        />
                    </FormGroup>
                </div>
            </>
            )}
        </>
    )
}
