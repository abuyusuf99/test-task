import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUser } from "./Features/userSlice";
import style from "./Features/App.module.css";

function App() {
  const users = useSelector((state) => state.userSlice.oneuser || [])
  const error = useSelector((state) => state.userSlice.error);
  const load = useSelector((state) => state.userSlice.loading);

  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [controller, setController] = useState(null)
  const dispatch = useDispatch();
  
  const formatPh = (input) => {
    const phoneNumber = input.replace(/\D/g, "");

    
    const formattedNumber = phoneNumber.replace(/(\d{2})(?=\d)/g, "$1-");
    
    return formattedNumber;
  };
  

  const handleNumber = (e) => {
    const formattedNumber = formatPh(e.target.value);
    setNumber(formattedNumber);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(controller){
      controller.abort()
    }

    const newController = new AbortController()
    setController(newController)
     dispatch(findUser({ email, number: number.replace(/-/g, "") }))
    setEmail("");
    setNumber("");
  };
  useEffect(() => {
    return () => {
      // Отменяем запрос при размонтировании компонента
      if (controller) {
        controller.abort();
      }
    };
  }, [controller]);

  

  return (
    <>
      <div className={style.rod1}>
        <div className={style.input}>
          <input
          required
            value={email}
            placeholder="Введите Email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <input
          required
            value={number}
            placeholder="Введите номер"
            onChange={handleNumber}
            type="text"
          />
          <div className={style.button}>
            <button  type="" onClick={handleSubmit}>
              Поиск
            </button>
            {load ? <div>...loading</div> : null }
          </div>
        </div>
      {error ? <div>{error}</div> : null}
          <>
            {error ? null : (users.map((item) => {
              return (
                <>
                  <div key={item._id}>
                    <div>
                      <div>Имя:{item.name}</div>
                      <div>Почта:{item.email}</div>
                      <div>Номер {item.number}</div>
                    </div>
                  </div>
                </>
              );
            }))}
          </>
      </div>
    </>
  );
}

export default App;
