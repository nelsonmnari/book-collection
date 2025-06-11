import { useEffect, useState } from "react";
import axios from "axios";


const API = 'http://localhost:4000/books';

export default function App() {
  const[books, setBooks] = useState([]);
  const[form, setForm] = useState({
    title: '',
    author: ''})
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState('');


  useEffect(() => {
    fetchBooks();
}, []);

const fetchBooks = async () => {
  try{
    const res = await axios.get(API);
    setBooks(res.data);
  } catch (err) {
    setError('failed to fetch books');
  }
};

const handleAdd = async () => {
  if (!form.title.trim()) return setError('Title is required');
  setLoading(true);

  try{
    const res = await axios.post(API, form);
    setBooks(prev => [...prev, res.data]);
    setForm({ title: '', author: '' });
    setError('');
  }catch (error) {
    setError('Failed to add book');
  }
  setLoading(false);
};


return (
  <div className="min-h-screen bg-gray-100 py-6 sm:px-10">
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">Book Collection</h1>
      
      {/*Form */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          className="flex-1 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Book Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="flex-1 border border-gray-300 p-3 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <button
          onClick={handleAdd}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </div>
      {/*Error Message */}
      {error && (
        <div className="mb-4 text-red-500 font-semibold text-sm">
          {error}
        </div>
      )}
      {/*Book List */}
      <div className="grid md:grid-cols-2 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800"> {book.title}</h2>
            {book.author && <p className="text-gray-600 italic mt-1">by {book.author}</p>}
            {book.publishedYear && <p className="text-gray-500 mt-1">Published: {book.publishedYear}</p>}
          </div>
        ))}
      </div>
    </div>
  </div>
  );
  
}