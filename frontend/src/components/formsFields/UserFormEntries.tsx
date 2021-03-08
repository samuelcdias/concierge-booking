import Input from "../Input";
import PasswordsFields from "./PasswordFields"

export default function UserFormEntries({ state, params, handleChange }: { state: any, params: any, handleChange: any }) {

    return (
        <>
            <Input
                className="input-nome"
                placeholder="Nome"
                name="name"
                value={state.name}
                onChange={handleChange}
            />
            <Input
                className="input-email"
                type="email"
                name="email"
                placeholder="email"
                value={state.email}
                onChange={handleChange}
            />
            <Input
                className="input-username"
                placeholder="username"
                name="username"
                value={state.username}
                onChange={handleChange}
            />
            <PasswordsFields state={state} handleChange={handleChange} params={params} />
        </>
    )
}