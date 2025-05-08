import { ChangeEvent, useState } from "react"
import styles from "./ModalCrearEditarProducto.tsx.module.css"
import { IProduct } from "../../../types/IProduct"
import Select, { StylesConfig } from "react-select"
import { MultiValue } from "react-select"
const initialValues: IProduct = {
    id: "",
    nombre: "",
    stock: 0,
    precio: 0,
    descripcion: "",
    categoria: 0,
    talle: "",
    color: [],
    marca: "",
    id_talle_producto: "",
    id_descuento_producto: ""
}
type OptionType = {
    value: string;
    label: string;
}
const mockedCategories: OptionType[] = [
    { value: "Urbano", label: "Urbano" },
    { value: "Rural", label: "Rural" },
    { value: "Mujer", label: "Mujer" },
    { value: "Hombre", label: "Hombre" }
]
const mockedSize: OptionType[] = [
    { value: "37", label: "37" },
    { value: "46", label: "37" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" }
]
//Estos estilos fueron proporcionados por chat gpt y modificados ligeramente por mi
const customStyles: StylesConfig<OptionType, true> = {
    control: (base, state) => ({
        ...base,
        minHeight: '28px',
        height: '40px',
        minWidth:'18rem',
        width: '100%',
        backgroundColor: 'white',
        borderColor: state.isFocused ? 'blue' : 'gray',
        boxShadow: state.isFocused ? '0 0 0 1px blue' : undefined,
        fontSize: '0.9rem',
        padding: '0 4px',
        alignItems:'center',
        '&:hover': {
            borderColor: 'blue',
        },
    }),
    valueContainer: (base) => ({
        ...base,
        padding: '0 6px',
        fontSize: '0.6rem',
    }),
    input: (base) => ({
        ...base,
        margin: 0,
        padding: 0,
        fontSize: '0.6rem',
    }),
    placeholder: (base) => ({
        ...base,
        fontSize: '0.6rem',
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: '#e0e0e0',
        borderRadius: 2,
        padding: '1px 4px',
        fontSize: '0.6rem',
    }),
    multiValueLabel: (base) => ({
        ...base,
        padding: '0 2px',
        fontSize: '0.6rem',
    }),
    multiValueRemove: (base) => ({
        ...base,
        padding: '0 2px',
        fontSize: '0.6rem',
        ':hover': {
            backgroundColor: 'red',
            color: 'white',
        },
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused
            ? 'lightblue'
            : state.isSelected
                ? 'blue'
                : 'white',
        color: state.isSelected ? 'white' : 'black',
        fontSize: '0.6rem',
        padding: '6px 8px',
    }),
    menu: (base) => ({
        ...base,
        fontSize: '0.6rem',
        zIndex: 9999,
    }),
};

export const ModalCrearEditarProducto = () => {
    const [workingProduct, setWorkingProduct] = useState<IProduct>(initialValues)
    const [selectedCategories, setSelectedCategories] = useState<MultiValue<OptionType>>([])
    const [selectedSizes, setSelectedSizes] = useState<MultiValue<OptionType>>([])



    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setWorkingProduct((prev) => ({ ...prev, [`${name}`]: value }))
        console.log(workingProduct)
    }
    return (
        <div className={styles.background} style={{}}>
            <div className={styles.mainContainer}>
                <div className={styles.header}>
                    <p>{workingProduct.nombre == "" ? "Añadir producto" : "Editar producto"}</p>
                </div>
                <div className={styles.mainContentContainer}>
                    <div className={styles.inputsContainer}>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Nombre:</p>
                            <input className={styles.inputsContainer_inputContainer_input} type="text"
                                name="nombre" value={workingProduct.nombre} onChange={handleChangeInputs} />
                        </div>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Categorias:</p>
                            <Select
                                className={styles.dropdown}
                                styles={customStyles}
                                options={mockedCategories}
                                isMulti
                                value={selectedCategories}
                                onChange={(newValues) => setSelectedCategories(newValues)}
                            />
                        </div>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Descripcion:</p>
                            <input className={styles.inputsContainer_inputContainer_input} type="text"
                                name="descripcion" value={workingProduct.descripcion} onChange={handleChangeInputs} />
                        </div>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Talle:</p>
                            <Select className={styles.dropdown}
                                styles={customStyles}
                                options={mockedSize}
                                isMulti
                                value={selectedSizes}
                                onChange={(newValues) => setSelectedSizes(newValues)}
                            />
                        </div>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Precio:</p>
                            <input className={styles.inputsContainer_inputContainer_input} type="text"
                                name="precio" value={workingProduct.precio} onChange={handleChangeInputs} />
                        </div>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Precio:</p>
                            <input className={styles.inputsContainer_inputContainer_input} type="text"
                                name="stock" value={workingProduct.stock} onChange={handleChangeInputs} />
                        </div>


                    </div>
                    <div className={styles.colorInputsContainer}>
                        <p>colors</p>
                    </div>
                    <div className={styles.bottomButtonsContaner}>
                        <p>crear</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
