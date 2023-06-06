type Props = {
  name: string;
  selectedIDs: number[];
  categoryID: number;
};

export default function CategoryDropDownElement({
  name,
  selectedIDs,
  categoryID,
}: Props) {
  return (
    <div className="flex items-center w-full mt-2">
      <input
        type="checkbox"
        checked={selectedIDs.includes(categoryID)}
        readOnly
        className="mr-3"
      />
      <span className="">{name}</span>
    </div>
  );
}
