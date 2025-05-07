import { ChangeEvent, useState } from "react"
import styles from "./ModalCrearEditarProducto.tsx.module.css"
import { IProduct } from "../../types/IProduct"
import Select from "react-select"
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
        <div className={styles.background}>
            <div className={styles.mainContainer}>
                <div className={styles.header}>
                    <p>{workingProduct.nombre == "" ? "Añadir producto" : "Editar producto"}</p>
                </div>
                <div className={styles.inputs}>
                    <p className={styles.label}>Nombre:</p>
                    <input className={styles.input} name="nombre" value={workingProduct.nombre} onChange={handleChangeInputs}/>
                    <p className={styles.label}>Categorias:</p>
                    <Select className={styles.dropdown}
                        options={mockedCategories}
                        isMulti
                        value={selectedCategories}
                        onChange={(newValues) => setSelectedCategories(newValues)}
                    />
                    <p className={styles.label}>Description:</p>
                    <input className={styles.input} name="descripcion" value={workingProduct.descripcion} onChange={handleChangeInputs}/>
                    <p className={styles.label}>Talle:</p>
                    <Select className={styles.dropdown}
                        options={mockedSize}
                        isMulti
                        value={selectedSizes}
                        onChange={(newValues) => setSelectedSizes(newValues)}
                    />
                    <p className={styles.label}>Precio:</p>
                    <input className={styles.input} name="precio" value={workingProduct.precio} onChange={handleChangeInputs}/>
                    <p className={styles.label}>Stock:</p>
                    <input className={styles.input} name="stock" value={workingProduct.stock} onChange={handleChangeInputs}/>
                </div>
                <div className={styles.colorInputs}>
                    <p>colores</p>
                </div>
                <div className={styles.buttons}>
                    <p>buttons</p>
                </div>
            </div>
        </div>
    )
}
