
import './app.css'
import { useEffect, useState } from 'react'
import Axios from 'axios'

function App() {

  // const paises = [
  //   {
  //     country: 'Qatar', sigla: 'QAT', cards: [
  //       { number: '1', have: 'false' },
  //       { number: '2', have: 'true' },
  //       { number: '3', have: 'false' },
  //       { number: '4', have: 'false' },
  //       { number: '5', have: 'false' },
  //       { number: '6', have: 'false' },
  //       { number: '7', have: 'false' },
  //       { number: '8', have: 'false' },
  //       { number: '9', have: 'false' },
  //       { number: '10', have: 'false' },
  //       { number: '11', have: 'false' },
  //       { number: '12', have: 'false' },
  //       { number: '13', have: 'false' },
  //       { number: '14', have: 'false' },
  //       { number: '15', have: 'false' },
  //       { number: '16', have: 'false' },
  //       { number: '17', have: 'false' },
  //       { number: '18', have: 'false' },
  //       { number: '19', have: 'false' },
  //       { number: '20', have: 'false' },
  //     ]
  //   },
  //   {
  //     country: 'Ecuador', sigla: 'ECU', cards: [
  //       { number: '1', have: 'false' },
  //       { number: '2', have: 'true' },
  //       { number: '3', have: 'false' },
  //       { number: '4', have: 'false' },
  //       { number: '5', have: 'false' },
  //       { number: '6', have: 'false' },
  //       { number: '7', have: 'false' },
  //       { number: '8', have: 'false' },
  //       { number: '9', have: 'false' },
  //       { number: '10', have: 'false' },
  //       { number: '11', have: 'false' },
  //       { number: '12', have: 'false' },
  //       { number: '13', have: 'false' },
  //       { number: '14', have: 'false' },
  //       { number: '15', have: 'false' },
  //       { number: '16', have: 'false' },
  //       { number: '17', have: 'false' },
  //       { number: '18', have: 'false' },
  //       { number: '19', have: 'false' },
  //       { number: '20', have: 'false' },
  //     ]
  //   },
  //   {
  //     country: 'Senegal', sigla: 'SEN', cards: [
  //       { number: '1', have: 'false' },
  //       { number: '2', have: 'true' },
  //       { number: '3', have: 'false' },
  //       { number: '4', have: 'false' },
  //       { number: '5', have: 'false' },
  //       { number: '6', have: 'false' },
  //       { number: '7', have: 'false' },
  //       { number: '8', have: 'false' },
  //       { number: '9', have: 'false' },
  //       { number: '10', have: 'false' },
  //       { number: '11', have: 'false' },
  //       { number: '12', have: 'false' },
  //       { number: '13', have: 'false' },
  //       { number: '14', have: 'false' },
  //       { number: '15', have: 'false' },
  //       { number: '16', have: 'false' },
  //       { number: '17', have: 'false' },
  //       { number: '18', have: 'false' },
  //       { number: '19', have: 'false' },
  //       { number: '20', have: 'false' },
  //     ]
  //   },
  //   {
  //     country: 'Netherlands', sigla: 'NED', cards: [
  //       { number: '1', have: 'false' },
  //       { number: '2', have: 'true' },
  //       { number: '3', have: 'false' },
  //       { number: '4', have: 'false' },
  //       { number: '5', have: 'false' },
  //       { number: '6', have: 'false' },
  //       { number: '7', have: 'false' },
  //       { number: '8', have: 'false' },
  //       { number: '9', have: 'false' },
  //       { number: '10', have: 'false' },
  //       { number: '11', have: 'false' },
  //       { number: '12', have: 'false' },
  //       { number: '13', have: 'false' },
  //       { number: '14', have: 'false' },
  //       { number: '15', have: 'false' },
  //       { number: '16', have: 'false' },
  //       { number: '17', have: 'false' },
  //       { number: '18', have: 'false' },
  //       { number: '19', have: 'false' },
  //       { number: '20', have: 'false' },
  //     ]
  //   },
  // ]

  const [abrv, setAbrv] = useState()
  const [abrvF, setAbrvF] = useState()
  const [paises, setPaises] = useState([])

  useEffect(() => {
    Axios.get('https://app-album-copa.herokuapp.com/getAll').then(
      res => {
        setPaises(res.data)
      }
    )
  })


  const handleSubmit = (event) => {
    event.preventDefault();
    setAbrvF(abrv)
  }

  const handleClick = (e) => {
    // e.preventDefault();
    Axios.post('https://app-album-copa.herokuapp.com/', {
      country: e.pais,
      number: e.number
    }).then(res => {
      console.log(res.data)
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' maxLength="3" placeholder='Sigla' onChange={(e) => setAbrv(e.target.value)}></input>
        <button type='submit'>Enviar</button>
      </form>

      <div className='container'>
        {abrvF ? paises.map(i => {
          if (i.sigla !== abrvF.toUpperCase()) {
            return (null)
          } else {
            return (
              <div className='country'>
                {i.sigla}
                {i.cards.map(item => {
                  return (
                    <div className="card" id={item.have} onClick={(e) => handleClick({ pais: i.country, number: item.number, have: item.have })}>
                      {item.number}
                    </div>
                  )
                })}
              </div>
            )
          }

        })
          :
          <div className='primeiro-erro'>Digite a sigla da seleção no campo acima</div>}
      </div>
    </div>
  );
}

export default App;
