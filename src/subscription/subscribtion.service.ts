import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubscribtionService {
    constructor(
        private prismaService: PrismaService
    ) {}

    async trySubscribeEmail(email) {
        const subscribedEmail = await this.prismaService.emails.findFirst({where: {email}});

        if (subscribedEmail && subscribedEmail.is_subscribed) throw new ConflictException();

        if (subscribedEmail) await this.prismaService.emails.update({where: {email}, data: {is_subscribed: true}});
        else await this.prismaService.emails.create({data: {email}});

        return;
    }
}
