//utils
import { useState, useRef } from 'react'
import {AnimalCardProps} from '../../../utils/global/animalCard/AnimalCard'
import AnimalData from '../../../assets/animals.json'

//components
import AnimalCard from '../../../utils/global/animalCard/AnimalCard'
import AnimalButton from '../../../utils/global/animalButton/AnimalButton'

//css & assets
import styles from './ambassadorList.module.css'
import arrow from '../../../assets/arrow.jpg'

export interface AmbassadorListProps{
    showAnimalList: boolean
}
export default function AmbassadorList(props: AmbassadorListProps){
    const [animals] = useState(AnimalData)
    const [activeAnimal, setActiveAnimal] = useState<AnimalCardProps["cardData"] | null>()

    const upArrowRef = useRef<HTMLImageElement>(null)
    const animalList = useRef<HTMLDivElement>(null)
    const downArrowRef = useRef<HTMLImageElement>(null)

    const animalListScroll = (direction: number) => {
        if(animalList.current)
            animalList.current.scroll({top: animalList.current.scrollTop - direction, left: 0, behavior: 'smooth'})
    }
    const handleArrowVisibility = () => {
        if(animalList.current){
            if(animalList.current.scrollTop === 0)
                upArrowRef.current?.classList.add(styles.hideArrow)
            else if(animalList.current.scrollTop + animalList.current.clientHeight === animalList.current.scrollHeight)
                downArrowRef.current?.classList.add(styles.hideArrow)
            else{
                upArrowRef.current?.classList.remove(styles.hideArrow)
                downArrowRef.current?.classList.remove(styles.hideArrow)
            }
        }
    }

    return (
        <div className={styles.ambassadorList}>
            <div className={`${styles.scrollAnimals} ${props.showAnimalList? styles.visible : styles.hidden}`}>
                <img ref={upArrowRef} src={arrow} className={`${styles.arrow} ${styles.up} ${styles.hideArrow}`} onClick={()=>animalListScroll(250)} alt="Up Arrow"/>
                <div ref={animalList} className={styles.animalList} onScroll={()=>handleArrowVisibility()}>
                    {animals && animals.map(animal => (
                        <AnimalButton
                            key={animal.name}
                            name={animal.name}
                            species={animal.species}
                            img={{
                                src: animal.img.src,
                                altText: animal.img.altText
                            }}

                            getCard={() => {setActiveAnimal(activeAnimal?.name === animal.name ? undefined : {...animal, dateOfBirth: new Date(animal.dateOfBirth) })}}
                            containerClassName={`${styles.animalButton} ${activeAnimal?.name === animal.name ? styles.animalButtonClicked : undefined}`}
                        />
                    ))}
                </div>
                <img ref={downArrowRef} src={arrow} className={`${styles.arrow} ${styles.down}`} onClick={()=>animalListScroll(-250)} alt="Down Arrow"/>
            </div>

            { activeAnimal && props.showAnimalList ? 
                <AnimalCard
                    key={activeAnimal.name}
                    cardData={{
                        ...activeAnimal,
                        img:{
                            src: activeAnimal.img.src,
                            altText: activeAnimal.img.altText
                        },
                        dateOfBirth: new Date(activeAnimal.dateOfBirth)
                    }}
                    close={() => {setActiveAnimal(undefined)}}
                    containerClassName={styles.animalCard}
                />: null
            }
        </div>
    )
}