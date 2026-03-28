import { Injectable } from 'nestjs/common';
import { InjectRepository } from 'nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    async create(email: string, password: string, username: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({
            email,
            password: hashedPassword,
            username,
        });
        return this.usersRepository.save(user);
    }

    async findByEmail(email: string) {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findById(id: number) {
        return this.usersRepository.findOne({ where: { id } });
    }

    async updateProfile(id: number, updateData: any) {
        await this.usersRepository.update(id, updateData);
        return this.findById(id);
    }

    async updateProfilePicture(id: number, pictureUrl: string) {
        await this.usersRepository.update(id, { profilePicture: pictureUrl });
        return this.findById(id);
    }

    async updateProfileVideo(id: number, videoUrl: string) {
        await this.usersRepository.update(id, { profileVideo: videoUrl });
        return this.findById(id);
    }

    async updateBio(id: number, bio: string) {
        await this.usersRepository.update(id, { bio });
        return this.findById(id);
    }

    async updateStatus(id: number, statusContent: string) {
        await this.usersRepository.update(id, { status: statusContent });
        return this.findById(id);
    }

    async validatePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}