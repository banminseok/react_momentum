import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { usernameState } from "../atom";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction : row;
`;
const Input = styled.input`
  border: none;
  -webkit-appearance: none;
  -ms-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #f2f2f2;
  padding: 12px;
  border-radius: 3px;
  width: 350px;
  font-size: 14px;
  ime-mode: active;
`;
const Button = styled.button`
  width: 20%;  
  font-size: 20px;
  border-radius: 5px;
  padding : 8px 10px;
  margin-left:2px;
`;
const ErrMsg = styled.div`
  padding: 5px;
  color : tomato;
`;
const TitleMyName = styled.div`
  position: relative;
  font-weight: 800;
  font-size: 48px;
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: calc(50% + 2px);
    left: -10px;
    width: calc(100% + 20px);
    height: 40%;
    transform: translateY(-50%);

    z-index: -1;
    background-color: rgb(224, 185, 243);
  }
`


interface IForm {
  myName: string;
}

function Momentum() {
  const [username, setUsername] = useRecoilState(usernameState);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IForm>();
  const handleValid = ({ myName }: IForm) => {
    setUsername(myName);
    setValue("myName", "");
  };
  return (
    <Wrapper >
      {username === "" ? (
        <>
          <form onSubmit={handleSubmit(handleValid)}>
            <Container>
              <Input
                {...register("myName", {
                  required: "사용자 이름을 입력하세요.",
                  maxLength: 15,

                })}
                placeholder="what is your name?" />
              <Button>Add</Button>
            </Container>
          </form>
          {errors.myName && <ErrMsg>{errors.myName.message}</ErrMsg>}
        </>
      ) : (
        <TitleMyName>{username}</TitleMyName>
      )}
    </Wrapper>
  );
}

export default Momentum;