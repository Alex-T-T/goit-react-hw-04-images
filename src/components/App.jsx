// import React from "react";
import { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImagePendingView } from 'components/ImagePendingView/ImagePandingView';
import { ImageLoadingView } from 'components/ImageLoadingView/ImageLoadingView';
import { ImageErrorView } from 'components/ImageErrorView/ImageErrorView';
import { fetchImages } from 'Servises/Pixabay-api';
import { ButtonLoadMore } from 'components/ButtonLoadMore/ButtonLoadMore';

export const App = () => {

  const [images, setImages] = useState({
    hits: [],
    totalHits: '',
    total: '',
  });
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(true);


  useEffect(() => {

    if(value === '') {
      return
    }

    setIsLoading(true);
    setError(null);
  
    const perPage = 12;

    fetchImages(value, page, perPage)
      .then(({ total, totalHits, hits }) => {
        setImages(images => ({
          hits: [...images.hits, ...hits],
          totalHits,
          total,
        })
        );
        setIsLoading(false);
  
        const totalPages = Math.ceil(totalHits / perPage);
          
        if (hits.length !== 0 && page === 1 ) {
          toast.success(` We found ${totalHits} images.`);
          setIsLoadMore(true);
        }

        if (page === totalPages) {
          toast.info("The End!");
          setIsLoadMore(false);
        }

        if (totalHits === 0) {
          return Promise.reject(new Error(`It's sad, but we have a problem! We can't find a "${value}"! Change your request please!`))
        }
        })
        .catch(error => {
          setError(error)
          Promise.reject(new Error(`${error.message}`))
          toast.error(` We can't find a "${value}"! `);
        })
  }, [page, value])
  


  // отримує значення value від Searchbar
  const handleFormSubmit = (searchValue) => {
        // console.log('this.state.value =>', this.state.value);
        // console.log('this.state.images =>', this.state.images);
        console.log(typeof searchValue)
    if (searchValue === value) {
        toast.error("Enter new search value or press 'Load More' !");
        return
      }
    

      setValue(searchValue)
      setImages({
        hits: [],
        totalHits: '',
        total: '',
      })
      setPage(1)
    
  }

  const loadMore = () => { setPage(page + 1);
    console.log('this.state.page =>', page)
  };

   return ( <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: 24,
                          color: '#010101',
                          paddingTop: '80px',
                        }}
      >
      <Searchbar onSubmit={handleFormSubmit} />
      
      { images.hits.length !== 0 && <>
        <ImageGallery images={images.hits } />
        {isLoadMore && <ButtonLoadMore onClick={loadMore} />}
      </>
      }
      { images.hits.length === 0 && !isLoading && <ImagePendingView />}
      {isLoading && <ImageLoadingView />}
      {error && <ImageErrorView wrongValue={error.message} />}
      
        <ToastContainer theme="dark" position="bottom-center" autoClose={3000} />
      </div>)
}



// export class App extends React.Component {
//   state = {
//     images: {
//       hits: [],
//       totalHits: '',
//       total: '',
//     },
//     value: '',
//     error: null,
//     isLoading: false,
//     page: 1,
//     perPage: 12,
//     isLoadMore: true,
//   }

//   componentDidUpdate(prevProps, prevState) {
//     // const searchValue = this.state.value;
//     const {value, page, perPage} = this.state
//     console.log( 'searchValue =>', value)


//     if (prevState.value !== value ||
//       prevState.page !== this.state.page) {
    
//       this.setState({ isLoading: true, error: null})

//       console.log("prevState.page =>", prevState.page);
//       console.log("thisState.page =>", page);

//       fetchImages(value, page, perPage)
//         .then(({ total, totalHits, hits }) => {
//           this.setState(prevState => ({
//             images: {
//               hits: [...prevState.images.hits, ...hits],
//               totalHits,
//               total,
//             },
//             isLoading: false,
          
//           }));
                


//         const totalPages = Math.ceil(totalHits / perPage);
          
//         if (hits.length !== 0 && page === 1 ) {
//           toast.success(` We found ${totalHits} images.`);
//           this.setState({isLoadMore: true,})
//         }

//         if (page === totalPages) {
//           toast.info("The End!");
//           this.setState({isLoadMore: false,})
//         }


//           if (totalHits === 0) {
//             return Promise.reject(new Error(`It's sad, but we have a problem! We can't find a "${value}"! Change your request please!`))
//           }
//         })
//         .catch(error => {
//           this.setState({ error })
//           Promise.reject(new Error(`${error.message}`))
//           toast.error(` We can't find a "${value}"! `);
//         })
//     }
//   }

//   // отримує значення value від Searchbar
//   handleFormSubmit = (value) => {
//         // console.log('this.state.value =>', this.state.value);
//         // console.log('this.state.images =>', this.state.images);
//         console.log(typeof value)
//     if (value === this.state.value) {
//         toast.error("Enter new search value or press 'Load More' !");
//         return
//       }
    
//         return this.setState({
//           value, 
//           images: {
//             hits: [],
//             totalHits: '',
//             total: '',
//         },
//           page: 1,
//         });
//   }

//   loadMore = () => { this.setState(prevState => ({ page: prevState.page + 1 }));
//     console.log('this.state.page =>', this.state.page)
//   };
    
//   render() { 
//     const {images, error, isLoadMore, isLoading } = this.state
//     return ( <div style={{
//                           display: 'flex',
//                           flexDirection: 'column',
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                           fontSize: 24,
//                           color: '#010101',
//                           paddingTop: '80px',
//                         }}
//       >
//       <Searchbar onSubmit={this.handleFormSubmit} />
      
//       { images.hits.length !== 0 && <>
//         <ImageGallery images={this.state.images.hits } />
//         {isLoadMore && <ButtonLoadMore onClick={this.loadMore} />}
//       </>
//       }
//       { images.hits.length === 0 && !isLoading && <ImagePendingView />}
//       {isLoading && <ImageLoadingView />}
//       {error && <ImageErrorView wrongValue={error.message} />}
      
//         <ToastContainer theme="dark" position="bottom-center" autoClose={3000} />
//       </div>)
//   }
// }

