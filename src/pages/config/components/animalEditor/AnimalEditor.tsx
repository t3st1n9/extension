import styles from './animalEditor.module.css';

import EditorForm from '../editorForm/EditorForm';
import AnimalCard, { AnimalCardProps } from '../../../../utils/animalCard/AnimalCard';
import AnimalButton from '../../../../utils/animalButton/AnimalButton';

//icons
import deleteIcon from '../../../../assets/buttonIcons/delete.svg';
import saveIcon from '../../../../assets/buttonIcons/save.svg';
import cancelIcon from '../../../../assets/buttonIcons/cancel.svg';

import { Link } from 'react-router-dom';
import { ChangeEvent } from 'react';

interface AnimalEditorProps {
  cardData: AnimalCardProps["cardData"]
  onChangeImg: (event: ChangeEvent<HTMLInputElement>) => void
  onEditForm: (inputProperty: string, inputValue: string) => void
}
export default function AnimalEditor(props: AnimalEditorProps) {
  const save = async () =>{
    const response = await fetch('http://localhost:3000/api/animals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.cardData)
    })
    const data = await response.json()
    console.log(data)
  }
  const deleteAnimal = async () =>{
    const response = await fetch('http://localhost:3000/api/animals/' + props.cardData.name, {
      method: 'DELETE'
    })
    const data = await response.json()
    console.log(data)

  }
  const cancel = async () =>{
    const response = await fetch('http://localhost:3000/api/animals/' + props.cardData.name, {
      method: 'GET'
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <div className={styles.page}>
    <Link to={"/"}>
      <button>Back</button>
    </Link>
    <div className={styles.animalEditor}>
      <div className={styles.editor}>
        <EditorForm
          cardData={{
            ...props.cardData,
            dateOfBirth: new Date(props.cardData.dateOfBirth)
          }}
          changeImg={(e: ChangeEvent<HTMLInputElement>)=>props.onChangeImg(e)}
          editForm={(property: string, value: string)=>props.onEditForm(property, value)}
        />
        <div className={styles.buttons}>
          <Link to={"/"}>
            <button className={styles.delete} onClick={()=>deleteAnimal()}>
              <img src={deleteIcon} alt="Trash Can Icon"/> 
              Delete
            </button>
          </Link>
          <div className={styles.mainButtons}>
            <button className={styles.save} onClick={()=>save()}>
              <img src={saveIcon} alt="Floppy Disc Icon"/> 
              Save
            </button>
            <button className={styles.cancel} onClick={()=>cancel()}>
              <img src={cancelIcon} alt="Undo Icon"/> 
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className={styles.preview}>
        <AnimalCard
          cardData={{
            ...props.cardData,
            dateOfBirth: new Date(props.cardData.dateOfBirth)
          }}
        /> 
        <AnimalButton
          name={props.cardData.name}
          species={props.cardData.species}
          img={props.cardData.img}
        />
      </div>
    </div>
    </div>
  )
}
