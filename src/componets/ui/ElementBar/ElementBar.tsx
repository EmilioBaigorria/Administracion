import { FC } from "react"
import { Button } from "../Button/Button"
import styles from "./ElementBar.module.css"
import { IProduct } from "../../../types/IProduct"
interface IElementBar {
  fields: string[]
  produtct?: IProduct
  categorie?:string
}
export const ElementBar: FC<IElementBar> = ({ fields, produtct,categorie }) => {
  return (
    <div>
      <div>
        <div>
          <div>
            {produtct?.nombre}
            {produtct?.categoria}
            {produtct?.stock}
            {produtct?.precio}
          </div>
          <div>

          </div>
        </div>

        <div>
          <Button action={() => { }} />
          <Button action={() => { }} />
        </div>
      </div>
    </div>
  )
}
