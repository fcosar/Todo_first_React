import React,{useState} from "react";

const AddTodoForm = ({yapilacaklar,setYapilacaklar}) => {
   const [yapilacakText,setYapilacakText]=useState("")
    
  const formuDenetle=(event)=>{
        event.preventDefault()
        if(yapilacakText === ""){
            alert("Boş kayıt yapılamaz")
            return
        }
        const newTodo={
            id:String(new Date().getTime()),
            text:yapilacakText,
            date:new Date(),
            yapildimi:false
        }
        setYapilacaklar([...yapilacaklar,newTodo]);
        setYapilacakText("")
    }
    return (
    <div className="d-flex justify-content-center">
      <form onSubmit={formuDenetle} className="w-75">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Yapilacak işi yazınız..."
            value={yapilacakText}
            onChange={(event)=>setYapilacakText(event.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Ekle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodoForm;