initialstate = {
  Login1: '',
  showHome: true,
  chauvhir: {},
  chauvhirls: {},
   bannerUrl: null,
  bannerLoading: false,
  bannerError: null,
};
export default (state = initialstate, action) => {
  switch (action.type) {
    case 'User_Login_Request':
      return {...state, isFetching: true};
    case 'User_Login_Success':
      return {...state, isFetching: false, Login1: action.payload};
    case 'User_Login_Error':
      return {...state, isFetching: false};
    case 'setHome':
      return {...state, showHome: false};
    case 'set_Chauvihar_event':
      return {...state, chauvhir: action.payload};
    case 'set_Chauvihar_event_page':
      return {...state, chauvhirls: action.payload};

 case 'BANNER_LOADING':
      return { ...state, bannerLoading: action.payload };
    case 'BANNER_FETCH_SUCCESS':
       console.log('BANNER_FETCH_SUCCESS Payload:', action.payload);
      return { ...state, bannerUrl: action.payload };

      
    case 'BANNER_FETCH_FAILED':
      return { ...state, bannerError: action.payload };
    default:
      return state;
  }
};
