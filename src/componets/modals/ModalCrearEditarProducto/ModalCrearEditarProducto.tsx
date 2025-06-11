import { ChangeEvent, FC, useEffect, useState } from "react"
import styles from "./ModalCrearEditarProducto.tsx.module.css"
import { IProduct } from "../../../types/IProduct"
import Select, { StylesConfig } from "react-select"
import { MultiValue } from "react-select"
import { Button } from "../../ui/Button/Button"
import { uploadImageToCloudinary } from "../../../http/imageRequest"
import { getAllCategories, getCategoriesById } from "../../../http/categorieRequest"
import { ICategories } from "../../../types/ICategories"
import { ISize } from "../../../types/ISize"
import { getAllSizes, getSizeById } from "../../../http/sizeRequest"
import { IDiscount } from "../../../types/IDiscount"
import { getAllDiscounts, getDiscountById } from "../../../http/discountRequest"
import { createProduct } from "../../../http/productRequest"
import Swal from "sweetalert2"
const initialValues: IProduct = {
    id: 0,
    nombre: "",
    stock: 0,
    precio: 0,
    descripcion: "",
    categorias: [],
    color: "",
    marca: "",
    imagen: "",
    descuento: {
        fechaInicio: new Date('2025-02-08'),
        fechaCierre: new Date('2025-07-08'),
        descuento: 30,
        productos: []
    },
    talles: []
}
const initialURL = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
type OptionType = {
    value: string;
    label: string;
}
const colors: OptionType[] = [
    { value: "Azul", label: "Azul" },
    { value: "Rojo", label: "Rojo" },
    { value: "Violeta", label: "Violeta" },
    { value: "Amarillo", label: "Amarillo" }
]
//Estos estilos fueron proporcionados por chat gpt y modificados ligeramente por mi
const customStyles: StylesConfig<OptionType, true> = {
    control: (base, state) => ({
        ...base,
        minHeight: '28px',
        height: '40px',
        minWidth: '18rem',
        width: '100%',
        backgroundColor: 'white',
        borderColor: state.isFocused ? 'blue' : 'gray',
        boxShadow: state.isFocused ? '0 0 0 1px blue' : undefined,
        fontSize: '0.9rem',
        padding: '0 4px',
        alignItems: 'center',
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
interface IModalCrearEditarProducto {
    isOpen: boolean,
    onClose: Function
}
export const ModalCrearEditarProducto: FC<IModalCrearEditarProducto> = ({ isOpen, onClose }) => {

    const [workingProduct, setWorkingProduct] = useState<IProduct>(initialValues)

    const [imageUrl, setImageUrl] = useState<string | null>(initialURL);

    const [selectedCategories, setSelectedCategories] = useState<MultiValue<OptionType>>([])
    const [categorieOptions, setCategorieOptions] = useState<OptionType[]>()

    const [selectedSizes, setSelectedSizes] = useState<MultiValue<OptionType>>([])
    const [sizesOptions, setsizesOptions] = useState<OptionType[]>()

    const [selectedColors, setselectedColors] = useState<OptionType>()

    const [selectedDiscount, setSelectedDiscount] = useState<OptionType>()
    const [discountOptions, setDiscountOptions] = useState<OptionType[]>()

    const handleFileChange = async (image: ChangeEvent<HTMLInputElement>) => {
        const file = image.target.files?.[0];
        if (file) {
            const url = await uploadImageToCloudinary(file);
            setImageUrl(url);
        }
    }

    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setWorkingProduct((prev) => ({ ...prev, [`${name}`]: value }))
    }

    const getCategories = async () => {
        const categories: ICategories[] = await getAllCategories()
        const cateOptions: OptionType[] = categories.map((el) => ({
            value: el.id ? el.id.toString() : "0",
            label: el.nombre
        }))
        setCategorieOptions(cateOptions)
    }

    const getSizes = async () => {
        const sizes: ISize[] = await getAllSizes()
        const sizesOptions: OptionType[] = sizes.map((el) => ({
            value: el.id ? el.id.toString() : "0",
            label: el.talle
        }))
        setsizesOptions(sizesOptions)
    }

    const getDiscounts = async () => {
        const discounts: IDiscount[] = await getAllDiscounts()
        const discountOptions: OptionType[] = discounts.map((el) => ({
            value: el.id ? el.id.toString() : "0",
            label: `${el.descuento}%-${new Date(el.fechaInicio.toString()).toLocaleDateString()}-${new Date(el.fechaCierre.toString()).toLocaleDateString()}`
        }))
        setDiscountOptions(discountOptions)
    }

    const handleSave = async () => {

        const productCategories = await Promise.all(
            selectedCategories.map(async (el) => {
                return await getCategoriesById(el.value);
            })
        );

        const productSizes = await Promise.all(
            selectedSizes.map(async (el) => {
                return await getSizeById(el.value);
            })
        );
        
        const productDiscount=selectedDiscount?.value ? await getDiscountById(selectedDiscount.value): await getDiscountById("1")
        


        const newProduct: IProduct = {
            nombre: workingProduct.nombre,
            descripcion: workingProduct.descripcion,
            precio: Number(workingProduct.precio),
            stock: Number(workingProduct.stock),
            categorias: productCategories,
            color: selectedColors?.value ? selectedColors?.value:"none",
            marca:workingProduct.marca ,
            imagen: imageUrl?imageUrl:"https://developer.valvesoftware.com/w/images/8/8b/Debugempty.png",
            descuento:productDiscount,
            talles: productSizes,
        }
        await createProduct(newProduct)
        Swal.fire({
            position: "center-end",
            icon: "success",
            title: "Producto creado",
            showConfirmButton: false,
            timer: 1500
            });
        handleClose()

    }

    const handleClose = () => {
        setWorkingProduct(initialValues)
        setImageUrl(initialURL)
        onClose()
    }

    useEffect(() => {
        getCategories()

        getSizes()

        getDiscounts()

    }, [])
    return (
        <div className={styles.background} style={{ display: isOpen ? "" : "none" }}>
            <div className={styles.mainContainer}>
                <div className={styles.header}>
                    <p>{workingProduct.nombre == "" ? "Añadir producto" : "Editar producto"}</p>
                    <div className={styles.header_X} onClick={handleClose}>✖</div>
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
                                options={categorieOptions}
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
                                options={sizesOptions}
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
                            <p className={styles.inputsContainer_inputContainer_label}>Stock:</p>
                            <input className={styles.inputsContainer_inputContainer_input} type="text"
                                name="stock" value={workingProduct.stock} onChange={handleChangeInputs} />
                        </div>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Color:</p>
                            <Select className={styles.dropdown}
                                styles={customStyles}
                                options={colors}
                                value={selectedColors}
                                onChange={(newValues) => setselectedColors(newValues)}
                            />
                        </div>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Descuento:</p>
                            <Select className={styles.dropdown}
                                styles={customStyles}
                                options={discountOptions}
                                value={selectedDiscount}
                                onChange={(newValues) => setSelectedDiscount(newValues)}
                            />
                        </div>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Imagen:</p>
                            <div className={styles.inputsContainer_inputContainer_uploadImageContainer}>
                                <input className={styles.imageInput} type="file" accept="image/*" onChange={handleFileChange} />
                                {imageUrl && (
                                    <div>
                                        <p>Preview:</p>
                                        <img src={imageUrl} alt="" width="120" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottomButtonsContaner}>
                        <Button text="Cancelar" action={handleClose} styleSet={false} />
                        <Button text="Crear" action={handleSave} styleSet={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}
