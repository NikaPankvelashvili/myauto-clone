import SearchBar from './SearchBar'
import Content from './Content'

export default function MainPage() {

  return (
    <div className='bg-bgColor min-h-[calc(100%-80px)] px-435px flex pt-16'>
      <SearchBar />
      <Content />
    </div>
  )
}
