import { FC } from "react"
import { IProduct } from "../../../types/IProduct"
import { Button } from "../Button/Button"
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
