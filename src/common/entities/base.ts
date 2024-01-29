import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export abstract class Base {
  /** 创建者 */
  @Column()
  creator: string;

  /** 创建时间 */
  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  /** 更新者 */
  @Column()
  updater: string;

  /** 更新时间 */
  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  /** 逻辑删除标志 */
  @Column({ default: true, name: 'is_active' })
  isActive: boolean;
}

@Entity()
export abstract class BaseWithId extends Base {
  /** 主键id */
  @PrimaryGeneratedColumn('uuid')
  id: number;
}
