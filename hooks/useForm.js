import { useState } from "react"

export const useForm = (INITIAL_STATE= {}) => {
    const [form, setForm] = useState(INITIAL_STATE)

    const handleChange = (e) => {
        const {name, value} = e
        console.log("e", {name, value})
        const newForm = {...form}
        newForm[name] = value.toString()

        setForm(newForm)
    }

    const setFormData = (data) => {
        setForm(data)
    }

    return {
        form,
        handleChange,
        setFormData
    }
}