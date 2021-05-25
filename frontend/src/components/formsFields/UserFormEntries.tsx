import FormGroup from "../FormGroup";
import Input from "../Input";
import PasswordsFields from "./PasswordFields"
import styles from "../../styles/components/fields.module.css"

export default function UserFormEntries({ state, params, handleChange }: { state: any, params: any, handleChange: any }) {

    return (
        <>
            <div className={styles.displayLine} >
                <FormGroup
                    label="Nome"
                >
                    <Input
                        className="input-nome"
                        width="300px"
                        type="text"
                        name="name"
                        placeholder="Insira o nome"
                        value={state.name}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup
                    label="E-mail"
                >
                    <Input
                        className="input-email"
                        width="300px"
                        type="email"
                        name="email"
                        placeholder="Insira o e-mail"
                        value={state.email}
                        onChange={handleChange}
                    />
                </FormGroup>
            </div>
            <FormGroup
                label="Username"
            >
                <Input
                    className="input-username"
                    width="300px"
                    type="text"
                    name="username"
                    placeholder="Insira o username"
                    value={state.username}
                    onChange={handleChange}
                />
            </FormGroup>
            <PasswordsFields state={state} handleChange={handleChange} params={params} />
        </>
    )
}