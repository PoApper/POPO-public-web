import Layout from '../../components/layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const WhiteBookIndexPage = () => {
  const [whitebookList, setWhitebookList] = useState([])

  useEffect(() => {
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/whitebook`).
      then(res => setWhitebookList(res.data)).
      catch(() => console.log('생활백서를 불러오는데 실패했습니다.'))
  }, [])

  return (
    <Layout>
      <h1>생활백서</h1>
      <p style={{fontSize: "18px", marginBottom: "2rem"}}>
        야생의 POSTECH에서 살아남기 위한 생활 백서! 📚 <br/>
        카카오톡 플러스친구 &apos;POSTECH 생활백서&apos;를 통해서도 이용하실 수 있습니다 😉
      </p>
      <CardDiv>
        {
          whitebookList.map((card: any, idx) => {
            return (
              <Card key={idx}>
                <h2>
                  <a target="_blank" href={card.link} rel="noreferrer">
                    {card.title}
                  </a>
                </h2>
                <p>
                  {card.content}
                </p>
              </Card>
            )
          })
        }
      </CardDiv>
    </Layout>
  )
}

export default WhiteBookIndexPage

const CardDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
`

const Card = styled.div`
  border-radius: 14px;
  background-color: #fff;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 7%);
  padding: 25px 24px 25px;

  &:hover {
    transform: translateY(-5px);
  }
  
  p {
    font-size: 16px;
  }
`