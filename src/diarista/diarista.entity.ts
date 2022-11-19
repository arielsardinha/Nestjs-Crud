import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Diarista {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  nome: string;
  @Column({ nullable: false })
  endereco: string;
  @Column({ nullable: false })
  idade: number;
}
