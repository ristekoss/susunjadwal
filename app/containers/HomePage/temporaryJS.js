import styled from 'styled-components';
import BACKGROUND from './backgroundDesktop.jpg'

export const LoginPage = styled.div`

  .wholeContainer{
    height:100%;
    min-height:100vh;
    position:relative;
    background-image:url(${BACKGROUND});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    .loginContainer{
      width: 100%;
      height: 100%;
      max-width: 1200px;
      min-height: 100vh;
      margin: 0 auto;
      position: relative;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      align-content: center;

      img{
        height: 20rem;
        width: auto;
        margin-top:-5rem;
        position:absolute;

      }

      .loginButton{
        margin-top:4rem;
        position:relative;
        border-radius:0.5rem;
        box-shadow: 6px 10px 5px 0px rgba(0,0,0,0.1);
        width:28rem;
        height:3rem;
        background:linear-gradient(to right, #245472 0% ,#3399cc 51%, #cccccc 120%);
        font-size:1.25rem;
        color:white;
        transition: all 0.3s ease 0s;
        cursor:pointer;

        &:hover{
          box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.5);
          transform: translateY(-7px);

        }

      }

    }

  }


`;
