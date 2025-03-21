import styled from "styled-components";

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space.small} ${({ theme }) => theme.space.medium};
  border: none;
  border-radius: ${({ theme }) => theme.radius.default};
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.space.medium};
`;

export const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

export const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 12px;
  margin-top: ${({ theme }) => theme.space.xs};
`;
