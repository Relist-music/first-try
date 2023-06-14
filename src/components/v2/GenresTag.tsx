import styled from '@emotion/styled';

const GenresTagStyles = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1px 8px 3px 8px;

  background: #f7d77d;
  color: #735a13;
  border-radius: 4px;

  font-family: 'Apfel Grotezk';
  font-weight: 600;
  letter-spacing: 0.04rem;
  line-height: 100%;
`;

export const GenresTag = ({ label }: { label: string }) => {
  return <GenresTagStyles>{label}</GenresTagStyles>;
};
