import { useRecoilState, useRecoilValue } from "recoil";
import { categoryListState, categoryState } from "../atom";

interface ISelect {
  itemAll: boolean;
  getSelectValue: Function,
}

function CategorySelectBox(props: ISelect) {
  const [category, setCategory] = useRecoilState(categoryState);
  const categores = useRecoilValue(categoryListState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    //setCategory(event.currentTarget.value as any);
    props.getSelectValue(event.currentTarget.value as any);
  };
  return (
    props.itemAll ? (
      <select className="todo-category" value={category} onInput={onInput}>
        {categores?.map((item) => (<option key={item.id} value={item.text}>{item.text}</option>))}
      </select>) : (
      <select className="action-category" onInput={onInput}>
        <option value="">-선택-</option>
        {categores?.filter((cate) => cate.text != category).map((item) => (<option key={item.id} value={item.text}>{item.text}</option>))}
      </select>
    )
  );

}

export default CategorySelectBox;