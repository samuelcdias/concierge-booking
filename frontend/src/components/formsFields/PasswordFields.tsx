import Input from "../Input";

export default function PasswordsFields({ state, params, handleChange }: any) {
    return (
        <>
            {(params.id === undefined) && (<>
                <Input
                    className={`input-password ${params.id && 'hidethis'}`}
                    type="password"
                    placeholder="Senha"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                />
                <Input
                    className={`input-confirm-password ${params.id && 'hidethis'}`}
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirme a Senha"
                    onChange={handleChange}
                />
            </>
            )}
        </>
    )
}
