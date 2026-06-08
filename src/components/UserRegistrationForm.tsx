import { useState } from "react";
import { search } from "../services/ViaCepAPI";
import { saveUser } from "../services/InternalAPI";


function UserRegistrationForm() {
    const [name, setName] = useState("");
    const [document, setDocument] = useState("");
    const [email, setEmail] = useState("");
    const [dataOfBirth, setDataOfBirth] = useState("");
    const [cep, setCep] = useState("");
    const [street, setStreet] = useState("");

    const [errorCep, setErrorCep] = useState("");
    const [errorInternalAPI, setErrorInternalAPI] = useState("");

    async function getByCepId(cep: string) {
        try {
            const data = await search(`/ws/${cep}/json/`)

            if (data.erro) {
                setErrorCep("CEP não encontrado");
                return;
            }

            setStreet(data.logradouro);
        } catch (error) {
            setErrorCep("Erro ao consultar CEP");
            console.error()
        }
    }

    async function createUser() {

        try {
            const payload = {
                name: name,
                document: document,
                email: email,
                dataBirth: dataOfBirth,
                address: {
                    street: street,
                    cep: Number(cep)
                }
            };
            console.log("Name: " + name);
            const response = await saveUser("/user/register", payload);

            console.log("Resposta: " + response)

        } catch (error) {
            console.log(error)
            setErrorInternalAPI("Erro ao tentar cadastrar usuário")
            console.error("Erro ao tentar cadastrar: ", error);
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        createUser();
    }

    return (
        <div className="container">
            
            <form id="form" onSubmit={handleSubmit}>
                <h1>Cadastre-se</h1>

                <label htmlFor="">Nome Completo</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="">CPF</label>
                <input
                    type="text"
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    required
                />

                <label htmlFor="">E-mail</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    required
                />

                <label htmlFor="">Data de Nascimento</label>
                <input
                    type="date"
                    value={dataOfBirth}
                    onChange={(e) => setDataOfBirth(e.target.value)}
                    required
                />

                <label htmlFor="">CEP</label>
                <input
                    type="text"
                    name="cep"
                    required
                    value={cep}
                    onChange={(e) => {
                        setErrorCep("")
                        const data = e.target.value.replace(/\D/g, "");

                        setCep(data);

                        if (data.length === 8) {
                            getByCepId(data);
                        }
                    }}
                />
                <span>{errorCep}</span>

                <label htmlFor="">Endereço</label>
                <input
                    type="text"
                    name="street"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />

                <button type="submit">Cadastrar</button>
                <span>{errorInternalAPI}</span>
            </form>
        </div>
    )
};

export default UserRegistrationForm;