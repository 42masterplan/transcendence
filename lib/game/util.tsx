import Ball from '@/lib/classes/Ball';
import Player from '@/lib/classes/Player';
import {SCREEN_WIDTH, SCREEN_HEIGHT, PADDLE_OFFSET} from './macros';
import io, {Socket} from 'socket.io-client'; // 이렇게 수정하세요

export function bounceIfCollided(ball: Ball, player: Player, playerB: Player) {
  const debouncingTime = 300;
  const now = Date.now();
  if (ball.lastCollision && now - ball.lastCollision < debouncingTime) return;
  if (player.isACollided(ball)) player.handleCollision(ball, now);
  else if (playerB.isBCollided(ball)) playerB.handleCollision(ball, now);
}

export function handleKeyDowns(
  keysPressed: {[key: string]: boolean},
  player: Player,
  socket: Socket
) {
  if (!player) return;
  //we dont want to edit values on frontend, only on backend so we emit
  if (keysPressed['a'] || keysPressed['A']) {
    if (player.x > 0) {
      player.x -= PADDLE_OFFSET;
      // player.dx = PADDLE_OFFSET;
      socket.emit('keyDown', 'a');
    }
  }
  if (keysPressed['d'] || keysPressed['D']) {
    if (player.x < SCREEN_WIDTH - player.width) {
      player.x += PADDLE_OFFSET;
      // player.dx = PADDLE_OFFSET;
      socket.emit('keyDown', 'd');
    }
  }
  if (keysPressed['w'] || keysPressed['W']) {
    // if (player.y > (SCREEN_HEIGHT / 3) * 2 - player.height)
    player.y -= PADDLE_OFFSET / 2;
    socket.emit('keyDown', 'w');
  }
  if (keysPressed['s'] || keysPressed['S']) {
    // if (player.y < SCREEN_HEIGHT - player.height)
    player.y += PADDLE_OFFSET / 2;
    socket.emit('keyDown', 's');
  }
}

export function handleKeyUps(
  keysPressed: {[key: string]: boolean},
  player: Player,
  socket: Socket
) {
  if (!player) return;
  if (!player.dx) return;
  if (
    !keysPressed['a'] &&
    !keysPressed['A'] &&
    !keysPressed['d'] &&
    !keysPressed['D']
  ) {
    player.dx = 0;
    socket.emit('keyUp');
  }
}
