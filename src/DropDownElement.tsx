type Props = {
  name: string;
  selectedIDs: string[];
  manID: string;
};

export default function DropDownElement({ name, selectedIDs, manID }: Props) {
  return (
    <div className="flex items-center w-full mt-2">
      <input
        type="checkbox"
        checked={selectedIDs.includes(manID)}
        readOnly
        className="mr-3"
      />
      <span className="">{name}</span>
    </div>
  );
}
