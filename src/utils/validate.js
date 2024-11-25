export const checkValidateData= (email,password) =>{
    const checkEmail=/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email);
    const checkPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    if(!checkEmail){
        return "Email ID is not valid"
    }else if(!checkPassword){
        return "Password is not valid"
    }else{
        return null;
    }
}