import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-row-gap: 0;
  grid-template-columns: repeat(auto-fill, minmax(164px, 1fr));
  padding: 2rem;
`;

export const SearchSongsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  margin: 1rem 0 2rem;
`;
