type Props = {
  Foto: Function,
  selected: Boolean,
}

export default function SearchBarCategory({ Foto, selected }: Props) {
  return (
    <div
      className={`
       h-12 ${selected ? 'bg-white' : 'bg-grey'} flex items-center justify-center 
       w-full cursor-pointer border-b-2 ${selected ? 'border-b-orange' : 'border-b-grey'}
        ${!selected ? 'hover:bg-white' : ''}`}
    >

      <Foto size="1.8rem" color={selected ? '#FD4100' : '#8C929B'} />

    </div>
  );
}
