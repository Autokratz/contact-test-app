import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './contacts.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [searchTerm, contacts]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search contacts"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="card-container">

        {filteredContacts.map(contact => (
          <div className="card" key={contact.id}>
            <h2>{contact.name}</h2>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
  
  
};

export default Contacts;
