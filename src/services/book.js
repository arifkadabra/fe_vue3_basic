import authHeader from './auth.header';
import api from './api';

class BookService {
  list() {
    return api.get('book', { headers: authHeader() });
  }
  
  store(data) {
    return api.post('book', data, { headers: authHeader() });
  }

  update(id,data) {
    return api.put(`book/${id}`, data, { headers: authHeader() });
  }

  destroy(id) {
    return api.delete(`book/${id}`, { headers: authHeader() });
  }
}

export default new BookService();
