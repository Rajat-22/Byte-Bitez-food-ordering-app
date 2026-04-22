import { useContext, useState } from "react"
import Modal from "../UI/Modal"
import CartContext from "../store/CartContext"
import { currencyFormatter } from "../utils/formatCurrency"
import Input from "../UI/Input"
import Button from "../UI/Button"
import UserProgressContext from "../store/UserProgressContext"
import useHttp from "../hooks/useHttp"
import Error from "../UI/Error"

const requestConfig = {
    method : 'POST',
    headers: {
        'Content-Type' : 'application/json'
    }
}

export default function CheckOut(){
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)

    const {data, isLoading : isSending, error, sendRequest, clearData} = useHttp(`${import.meta.env.VITE_API_BASE_URL}/orders`, requestConfig)

    const [validationErrors, setValidationErrors] = useState({})

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => 
    totalPrice + item.quantity * item.price , 0)

    function handleClose(){
        userProgressCtx.hideCheckout()
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart()
        clearData()
    }

    function validate(customerData) {
        const errors = {}
        if (!customerData.name.trim()) errors.name = 'Full name is required.'
        if (!customerData.email.trim() || !customerData.email.includes('@')) errors.email = 'A valid email is required.'
        if (!customerData.street.trim()) errors.street = 'Street is required.'
        if (!customerData['postal-code'].trim()) errors['postal-code'] = 'Postal code is required.'
        if (!customerData.city.trim()) errors.city = 'City is required.'
        return errors
    }

    function handleSubmit(event){
   event.preventDefault();

   const fd = new FormData(event.target);
   const customerData = Object.fromEntries(fd.entries())

   const errors = validate(customerData)
   if (Object.keys(errors).length > 0) {
       setValidationErrors(errors)
       return
   }
   setValidationErrors({})

   sendRequest(
    JSON.stringify({
        order : {
            items: cartCtx.items,
            customer : customerData
        } 
    })
)
    }

    let actions = (
        <>
         <Button type="button" textOnly onClick={handleClose}>Close</Button>
        <Button>Submit Order</Button>
        </>
    );

    if(isSending){
        actions = <span>Sending order ....</span>
    }

    if(data && !error){
        return <Modal 
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleFinish}>
            <h2>Success !</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you with more details via email within the next few minutes.</p>

            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>

    }

    return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
 <form onSubmit={handleSubmit} noValidate>
    <h2>Checkout</h2>
    <p>Total Amout : {currencyFormatter.format(cartTotal)}</p>

    <Input label="Full Name" type="text" id="name" />
    {validationErrors.name && <p className="input-error">{validationErrors.name}</p>}

    <Input label="E-mail Address" type="email" id="email" />
    {validationErrors.email && <p className="input-error">{validationErrors.email}</p>}

    <Input label="Street" type="text" id="street" />
    {validationErrors.street && <p className="input-error">{validationErrors.street}</p>}

    <div className="control-row">
      <div>
        <Input label="Postal Code" type="text" id="postal-code" />
        {validationErrors['postal-code'] && <p className="input-error">{validationErrors['postal-code']}</p>}
      </div>
      <div>
        <Input label="City" type="text" id="city" />
        {validationErrors.city && <p className="input-error">{validationErrors.city}</p>}
      </div>
    </div>

    {error && 
    <Error title="Failed to submit order" message={error} />}

    <p className="modal-actions">{actions}</p>
 </form>
    </Modal>
}
