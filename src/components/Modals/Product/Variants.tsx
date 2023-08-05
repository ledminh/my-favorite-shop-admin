export default function Variants() {
  return (
    <Wrapper>
      <Title>Variant</Title>
      <List>
        <Item>
          <Button>Add new variant</Button>
        </Item>
        <Item>
          <Button>Variant 1</Button>
        </Item>
        <Item>
          <Button>Variant 2</Button>
        </Item>
        <Item>
          <Button>Variant 3</Button>
        </Item>
        <Item>
          <Button>Variant 4</Button>
        </Item>
      </List>
    </Wrapper>
  );
}

/****************************
 * Styles
 */
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-4">{children}</div>
);

const Title = ({ children }: { children: React.ReactNode }) => (
  <div className="font-bold border-b-2 border-blue-950">{children}</div>
);

const List = ({ children }: { children: React.ReactNode }) => (
  <ul className="flex flex-wrap gap-2">{children}</ul>
);

const Item = ({ children }: { children: React.ReactNode }) => (
  <li className="flex flex-col gap-2">{children}</li>
);

const Button = ({ children }: { children: React.ReactNode }) => (
  <button className="p-4 border border-blue-950">{children}</button>
);
