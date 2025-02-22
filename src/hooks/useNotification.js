import toast,{Toaster} from "react-hot-toast";

function notify(type,message){
    
    if(type == 'success'){
        toast.success(message);
    }
    if(type == 'error'){
        toast.error(message)
    }
}

export {
    notify,
    Toaster,
    toast
}