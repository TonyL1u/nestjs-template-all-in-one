import { genSaltSync, hashSync } from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

import { Base as BaseEntity } from '@/common/entities';
import { createNanoid } from '@/common/utils';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ default: createNanoid({ withDate: false }) })
  name: string; // 用户名

  @Column()
  email: string; // 邮箱

  @Column()
  password: string; // 密码

  @Column({ default: '' })
  avatar: string; //头像

  @BeforeInsert()
  setUniqueData() {
    const id = createNanoid({ prefix: 'USER' });
    const salt = genSaltSync();
    this.password = hashSync(this.password, salt);
    this.id = id;
    this.creator = id;
    this.updater = id;
  }
}
