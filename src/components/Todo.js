import React, { useState } from "react";


const Todo = ({ item, yapilacaklar, setYapilacaklar }) => {
  
  const [guncelleButonuAktifMi, setGuncelleButonuAktifMi] = useState(false);
  const [guncellenecekText, setGuncellenecekText] = useState(item.text);
  const todoSil = () => {
    var gecici = [];
    for (let i = 0; i < yapilacaklar.length; i++) {
      if (item.id !== yapilacaklar[i].id) {
        gecici.push(yapilacaklar[i]);
      }
    }
    setYapilacaklar(gecici);
  };
  const yapildiDegistir = () => {
    var gecici = [];
    for (let i = 0; i < yapilacaklar.length; i++) {
      if (yapilacaklar[i].id === item.id) {
        var guncellenmisTodo = {
          ...item,
          yapildimi: !item.yapildimi,
        };
        gecici.push(guncellenmisTodo);
      } else {
        gecici.push(yapilacaklar[i]);
      }
    }
    setYapilacaklar(gecici);
  };
  const todoGuncelle=()=>{
    /* validation - doğrulama */
    if(guncellenecekText === ""){
      alert("Todo text boş bırakılamaz")
      return
    }
    if(guncellenecekText === item.text){
      setGuncelleButonuAktifMi(false)
      return
    }
    const digerYapilacaklar=yapilacaklar.filter(x => x.id !== item.id)
    var textMevcutMu=false
    digerYapilacaklar.map(diger => {
      if(diger.text.toLowerCase() === guncellenecekText.toLowerCase()){
        textMevcutMu=true
      }
    })
    if(textMevcutMu === true){
      if(window.confirm("Böyle bir kayıt zaten var. Yine de eklensin mi?") === false){
        return
      }
    }
    var gecici=[]
    for(let i=0;i<yapilacaklar.length;i++){
      if(yapilacaklar[i].id === item.id){
        var guncellenmisTodo={
          ...item,
          text:guncellenecekText,
          date:new Date()
        }
        gecici.push(guncellenmisTodo)
      }else{
        gecici.push(yapilacaklar[i])
      }
    }
    setYapilacaklar(gecici)
    setGuncelleButonuAktifMi(false)
  }
  return (
    <div className="alert alert-secondary d-flex justify-content-between">
      <div>
        {guncelleButonuAktifMi === true ? (
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Yapilacak işi yazın..."
              value={guncellenecekText}
              onChange={(event) => setGuncellenecekText(event.target.value)}
            />
            <button
              onClick={() => {
                setGuncelleButonuAktifMi(false);
                setGuncellenecekText(item.text);
              }}
              className="btn btn-danger">
              Vazgeç
            </button>
            <button onClick={todoGuncelle} className="btn btn-primary">Onayla</button>
          </div>
        ) : (
          <h2
            style={{
              textDecoration: item.yapildimi === true ? "line-through" : "none",
            }}>
            {item.text}
          </h2>
        )}
        <p>
          Tarih: {new Date(item.date).toLocaleString().replaceAll("/", ".")}
        </p>
      </div>
      <div className="d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Basic example"> 
          <button onClick={todoSil} type="button" class="btn btn-sm btn-danger">
            Sil
          </button>
          <button
            onClick={() => setGuncelleButonuAktifMi(true)}
            type="button"
            class="btn btn-sm btn-secondary">
            Güncelle
          </button>
          <button
            onClick={yapildiDegistir}
            type="button"
            class="btn btn-sm btn-info">
            {item.yapildimi === true ? "Yapılmadı" : "Yapıldı"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;