export const loginValidation = (formValue) =>{
    let error ={};
    if (!formValue.email){
        error.email = "Email is required"
    }else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValue.email)){
        error.email = "Email is invalid"
    }
    if (!formValue.password){
        error.password = "Password is required"
    }
    return error;
}

export const signValidation = (value) =>{
    let error ={};

    if (!value.name){
        error.name = "Name is required"
    }
    if (!value.email){
        error.email = "Email is required"
    }else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value.email)){
        error.email = "Email is invalid"
    }
    if (!value.password){
        error.password = "Password is required"
    }
    return error;
}