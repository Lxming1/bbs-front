import { Header } from '../../components/header'
import { Footer } from '../../components/footer'
import { Moment } from '../moment'
const XmHome = () => {
  return (
    <div>
      <Header />
      <div className="container w-8/12 mx-auto border-l-1 border-r-1 min-h-screen bg-white shadow-sm p-5">
        <Moment />
      </div>
      <Footer />
    </div>
  )
}

export default XmHome
