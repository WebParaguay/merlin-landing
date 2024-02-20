import { useState } from "react";

const BudgetForm = () => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [plan, setPlan] = useState('');
    const [integracion, setIntegracion] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = import.meta.env.PUBLIC_API_URL;
        
        try {
            const response = await fetch(`${apiUrl}/solicitar-presupuesto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    telefono,
                    email,
                    plan,
                    integracion
                })
            });
            const data = await response.json();

            setShowSuccess(true);
            clearForm();
        } catch (error) {
          console.log(error);
          alert('Error enviando mensaje');
        };
    };

    const clearForm = () => {
        setNombre('');
        setTelefono('');
        setEmail('');
        setPlan('');
        setIntegracion('');
    };

    return (
        <section className="section pt-0">
            <div className="container">
                <div className="row mb-8 mt-10">
                <div className="mx-auto text-center lg:col-7">
                    <h2>Solicitar Presupuesto</h2>
                </div>
                </div>
                <div className="row justify-center">
                <div className="md:col-6">
                    <form
                        className="lg:max-w-[484px]"
                    >
                        <div className="form-group mb-5">
                            <label className="form-label" htmlFor="name">Nombre y Apellido</label>
                            <input
                                required
                                className="form-control"
                                type="text"
                                id="name"
                                placeholder="Tu nombre y apellido"
                                onChange={(e) => setNombre(e.target.value)}
                                value={nombre}
                            />
                        </div>
                        <div className="form-group mb-5">
                            <label className="form-label" htmlFor="eamil">Número de teléfono</label>
                            <input
                                required
                                className="form-control"
                                type="text"
                                id="phone"
                                placeholder="Tu número de teléfono"
                                onChange={(e) => setTelefono(e.target.value)}
                                value={telefono}
                            />
                        </div>
                        <div className="form-group mb-5">
                            <label className="form-label" htmlFor="email">Correo electrónico</label>
                            <input
                                required
                                className="form-control"
                                type="text"
                                id="email"
                                placeholder="Tu correo electrónico"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <div className="form-group mb-5">
                            <label className="form-label" htmlFor="reason">Plan</label>
                            <select 
                                name="reason"
                                id="reason"
                                className="form-select"
                                required
                                onChange={(e) => setPlan(e.target.value)}
                                value={plan}
                            >
                                <option value="">Seleccionar plan</option>
                                <option value="BASICO">Plan Básico - Gs. 100.000</option>
                                <option value="ESTANDAR">Plan Estandar - Gs. 250.000</option>
                                <option value="PROFESIONAL">Plan Profesional - Gs. 350.000</option>
                                <option value="EMPRESARIAL">Plan Empresarial - Gs. 450.000</option>
                                <option value="PERSONALIZADO">Personalizado - Precio según necesidad</option>
                            </select>
                        </div>
                        <div className="form-group mb-5">
                            <label className="form-label" htmlFor="reason">Necesitas Integración?</label>
                            <select 
                                name="reason"
                                id="reason"
                                className="form-select"
                                required
                                onChange={(e) => setIntegracion(e.target.value)}
                                value={integracion}
                            >
                                <option value="">Seleccionar</option>
                                <option value="SI">Si</option>
                                <option value="NO">No</option>
                            </select>
                            <p className="mt-1 text-[12px]">Marque si, si ya cuenta con un sistema de gestión administrativa y quiere integrar el facturador al sistema</p>
                        </div>
                        <input type="hidden" name="v" />
                        <input
                            className="btn btn-primary block w-full"
                            type="submit"
                            value="Enviar Solicitud"
                            onClick={handleSubmit}
                        />
                        {showSuccess &&
                            <div className="notice tip relative mt-4">
                                <div className="notice-head absolute top-0 left-0 z-10 flex h-[30px] w-full items-center rounded-t-md px-3">
                                    <svg width="16px" height="16px" viewBox="0 0 512 512"><path fill="#fff" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>
                                    <p className="my-0 ml-1.5 text-base text-white">Enviado con éxito!</p>
                                </div>
                                <div className="notice-body my-0 rounded-b-md p-3 pt-[40px]">Nos pondremos en comunicación en la brevedad.</div>
                            </div>
                        } 
                    </form>
                </div>
                </div>
            </div>
        </section>
    );
};

export default BudgetForm;