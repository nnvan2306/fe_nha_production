export const isValidEmail= (email : string) : boolean=> {

    const emailRegex = /^[^\s@]+@gmail.com/;
    
    return emailRegex.test(email);
  }