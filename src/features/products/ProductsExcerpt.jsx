import { useNavigate } from "react-router-dom"

const ProductsExcerpt = ({ product }) => {
    const navigate = useNavigate()

    return (
        <div className='w-full border-2 border-zinc-300 mb-5' key={product.id}>
            <h3 className='bg-zinc-300 text-3xl font-bold text-center'>{product.title}</h3>
            <div className='flex justify-between'>
                <div className='flex'>
                    <img className='h-52' src={product.picture} alt={product.title} />
                    <h4 className='p-4'>{product.shortDescription}</h4>
                </div>
                <div className='text-right w-fit shrink-0 p-5 flex flex-col justify-between'>
                    <div>
                        <h3 className='text-2xl font-bold'>${product.price}</h3>
                        <h4 className='font-light'>with delivery: ${product.priceWithDelivery}</h4>
                        <h4 className='font-light'>in stock: {product.quantity}</h4>
                    </div>
                    <div className='flex gap-x-5'>
                        <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded' onClick={() => navigate(`/${product.id}/details`)}>Details</button>
                        <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded'>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsExcerpt