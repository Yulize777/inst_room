import React, {useState} from 'react';
import {useAddProductMutation, useGetProductsQuery} from "../../store/reducers/products";
import { v4 as uuidv4 } from 'uuid';
const Admin = () => {
    const [titleRu,setTitleRu] = useState('')
    const [titleEn,setTitleEn] = useState('')
    const [price,setPrice] = useState('')
    const [discount,setDiscount] = useState('')
    const [availability,setAvailability] = useState(false)
    const [noveltyRu,setNoveltyRu] = useState('')
    const [noveltyEn,setNoveltyEn] = useState('')
    const [salesRu,setSalesRu] = useState('')
    const [salesEn,setSalesEn] = useState('')
    const [purposeRu,setPurposeRu] = useState('')
    const [purposeEn,setPurposeEn] = useState('')
    const [consumptionEn,setConsumptionEn] = useState('')
    const [consumptionRu,setConsumptionRu] = useState('')
    const [packageEn,setPackageEn] = useState('')
    const [packageRu,setPackageRu] = useState('')
    const [dryingTimeEn,setDryingTimeEn] = useState('')
    const [dryingTimeRu,setDryingTimeRu] = useState('')
    const [descRu,setDescRu] = useState('')
    const [descEn,setDescEn] = useState('')
    const [category,setCategory] = useState('')
    const [subdivisionRu,setSubdivisionRu] = useState('')
    const [subdivisionEn,setSubdivisionEn] = useState('')
    const [id,setId] = useState('')

    const [addProduct] = useAddProductMutation()
    const handleAddProduct = async () => {
        const body = {
            id: Number(id),
            titleEn,
            titleRu,
            price: Number(price),
            discount: Number(discount),
            availability : Boolean(availability),
            noveltyEn,
            noveltyRu,
            salesEn,
            salesRu,
            purposeEn,
            purposeRu,
            consumptionEn,
            consumptionRu,
            packageEn,
            packageRu,
            dryingTimeEn,
            dryingTimeRu,
            descEn,
            descRu,
            category,
            subdivisionEn,
            subdivisionRu,
            bg: "",
            reviews: [],
            favorite: false,
            cart: false,
            comparison: false,
            count: 1
        }
        await addProduct(body)
        setTitleEn('')
        setTitleRu('')
        setPrice('')
        setDiscount('')
        setAvailability(false)
        setNoveltyEn('')
        setNoveltyRu('')
        setSalesEn('')
        setSalesRu('')
        setPurposeEn('')
        setPurposeRu('')
        setConsumptionRu('')
        setConsumptionEn('')
        setPackageEn('')
        setPackageRu('')
        setDryingTimeEn('')
        setDryingTimeRu('')
        setDescRu('')
        setDescEn('')
        setCategory('')
        setSubdivisionRu('')
        setSubdivisionEn('')
        setId('')
    }
    const {data = []} = useGetProductsQuery()
    return (
        <section className={'admin'}>
            <div className="container">
                <div className="admin__quantity">{data.length}</div>
                <div className="admin__form">
                    <input value={id} onChange={(e) => setId(e.target.value)} placeholder={'id'} type="text" className="admin__input"/>
                    <input value={titleRu} onChange={(e) => setTitleRu(e.target.value)} placeholder={'titleRu'} type="text" className="admin__input"/>
                    <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder={'titleEn'} type="text" className="admin__input"/>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder={'price'} type="number" className="admin__input"/>
                    <input value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder={'discount'} type="number" className="admin__input"/>
                    <label  className="admin__radio">
                        availability
                        <input onClick={(e) => setAvailability(e.target.value)} value={true} name={'availability'} type="radio" className="admin__availability"/> true
                        <input onClick={(e) => setAvailability(e.target.value)} value={false} name={'availability'} type="radio" className="admin__availability"/> false
                    </label>
                    <input value={noveltyRu} onChange={(e) => setNoveltyRu(e.target.value)} placeholder={'noveltyRu'} type="text" className="admin__input"/>
                    <input value={noveltyEn} onChange={(e) => setNoveltyEn(e.target.value)} placeholder={'noveltyEn'} type="text" className="admin__input"/>
                    <input value={descRu} onChange={(e) => setDescRu(e.target.value)} placeholder={'descRu'} type="text" className="admin__input"/>
                    <input value={descEn} onChange={(e) => setDescEn(e.target.value)} placeholder={'descEn'} type="text" className="admin__input"/>
                    <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder={'category'} type="text" className="admin__input"/>
                    <input value={subdivisionRu} onChange={(e) => setSubdivisionRu(e.target.value)} placeholder={'subdivisionRu'} type="text" className="admin__input"/>
                    <input value={subdivisionEn} onChange={(e) => setSubdivisionEn(e.target.value)} placeholder={'subdivisionEn'} type="text" className="admin__input"/>
                    <input value={salesRu} onChange={(e) => setSalesRu(e.target.value)} placeholder={'salesRu'} type="text" className="admin__input"/>
                    <input value={salesEn} onChange={(e) => setSalesEn(e.target.value)} placeholder={'salesEn'} type="text" className="admin__input"/>
                    <input value={purposeRu} onChange={(e) => setPurposeRu(e.target.value)} placeholder={'purposeRu'} type="text" className="admin__input"/>
                    <input value={purposeEn} onChange={(e) => setPurposeEn(e.target.value)} placeholder={'purposeEn'} type="text" className="admin__input"/>
                    <input value={consumptionEn} onChange={(e) => setConsumptionEn(e.target.value)} placeholder={'consumptionEn'} type="text" className="admin__input"/>
                    <input value={consumptionRu} onChange={(e) => setConsumptionRu(e.target.value)} placeholder={'consumptionRu'} type="text" className="admin__input"/>
                    <input value={packageEn} onChange={(e) => setPackageEn(e.target.value)} placeholder={'packageEn'} type="text" className="admin__input"/>
                    <input value={packageRu} onChange={(e) => setPackageRu(e.target.value)} placeholder={'packageRu'} type="text" className="admin__input"/>
                    <input value={dryingTimeEn} onChange={(e) => setDryingTimeEn(e.target.value)} placeholder={'dryingTimeEn'} type="text" className="admin__input"/>
                    <input value={dryingTimeRu} onChange={(e) => setDryingTimeRu(e.target.value)} placeholder={'dryingTimeRu'} type="text" className="admin__input"/>
                    <button onClick={() => handleAddProduct()} className="admin__btn">add product</button>
                </div>
            </div>
        </section>
    );
};

export default Admin;