import { Image, Modal, Table } from 'semantic-ui-react'

const EquipListTable = (props) => {
  const equips = props.equips

  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>#</Table.HeaderCell>
          <Table.HeaderCell width={8}>장비 이름</Table.HeaderCell>
          <Table.HeaderCell width={2}>예약비</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          equips.map((equip, idx) =>
            <Modal
              trigger={<Table.Row key={idx}>
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{equip.name}</Table.Cell>
                <Table.Cell>{equip.fee}</Table.Cell>
              </Table.Row>}
            >
              <Modal.Content>
                <Image size="medium" centered
                       src={equip.imageName ?
                         `${process.env.REACT_APP_API_URL}/equip/image/${equip.imageName}`
                         : 'https://via.placeholder.com/200?text=NoImage'}
                />
              </Modal.Content>
            </Modal>,
          )}
      </Table.Body>
    </Table>
  )
}

export default EquipListTable